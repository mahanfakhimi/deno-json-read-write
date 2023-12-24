type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const readPostsFile = async (filePath: string): Promise<Array<Post>> => {
  try {
    const fileContent = await Deno.readTextFile(filePath);
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
};

const writeTextFile = async (filePath: string, content: string): Promise<void> => {
  try {
    await Deno.writeTextFile(filePath, content);
    console.log("Written to", filePath);
  } catch (error) {
    console.error("Error writing file:", error);
    throw error;
  }
};

const writeJson = async (filePath: string, data: object): Promise<void> => {
  try {
    await writeTextFile(filePath, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing JSON file:", error);
    throw error;
  }
};

const main = async () => {
  const postsFilePath = "./posts.json";
  const postJsonFilePath = "./post-1.json";

  try {
    const posts = await readPostsFile(postsFilePath);
    console.log(posts);
    await writeJson(postJsonFilePath, posts[0]);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

// Run the main function
main();
