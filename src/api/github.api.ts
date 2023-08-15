import axios from 'axios';
import { IMGS_FILETYPES, LETTERS_FILETYPES } from '../web.config';
import { TYPE_GITHUB_FILE } from '../types/services.types';

export async function getRepositoryStructure(owner: string, repo: string, token: string, path = '') {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (response.status === 200) {
      const contents = response.data;

      const folderPromises = contents.map(async (content: any) => {
        if (content.type === 'dir') {
          const subContents = await getRepositoryStructure(owner, repo, token, content.path);
          return { dir: content.name, files: subContents };
        } else {
          return {
            name: content.name,
            type: content.type,
            url: content.download_url,
          };
        }
      });

      const foldersAndFiles = await Promise.all(folderPromises);

      return foldersAndFiles;
    } else {
      throw new Error(`Failed to fetch repository contents. Status code: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching repository contents: ${error.message}`);
    } else {
      throw new Error(`Error fetching repository contents: ${String(error)}`);
    }
  }
}

export async function searchFilesInGithubRepo(username: string, repo: string, token: string) {
  const headers = { Authorization: `Bearer ${token}` };

  async function searchRecursively(url: string, parentFolder: string) {
    try {
      const response = await axios.get(url, { headers });
      const imgs: TYPE_GITHUB_FILE[] = [];
      const letters: TYPE_GITHUB_FILE[] = [];

      for (const file of response.data) {
        if (file.type === 'file') {
          const fileType = file.name.split('.').pop()?.toLowerCase();

          const fileObject = {
            name: file.name,
            type: fileType,
            url: file.download_url,
            parentFolder: parentFolder,
          };

          if (IMGS_FILETYPES.includes(fileType)) imgs.push(fileObject);
          else if (LETTERS_FILETYPES.includes(fileType)) letters.push(fileObject);
        } else if (file.type === 'dir') {
          const subFolderContents = await searchRecursively(file.url, `${parentFolder}/${file.name}`);
          imgs.push(...subFolderContents.filter((f) => IMGS_FILETYPES.includes(f.type)));
          letters.push(...subFolderContents.filter((f) => LETTERS_FILETYPES.includes(f.type)));
        }
      }

      return [...imgs, ...letters];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error searching files: ' + error.message);
      } else {
        throw new Error('Error searching files: ' + String(error));
      }
    }
  }

  const rootUrl = `https://api.github.com/repos/${username}/${repo}/contents`;
  const result = await searchRecursively(rootUrl, '');

  const imgs = result.filter((file) => IMGS_FILETYPES.includes(file.type));
  const letters = result.filter((file) => LETTERS_FILETYPES.includes(file.type));

  return { imgs, letters };
}
