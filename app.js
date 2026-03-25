// Test your file
console.log("App running");
console.log(process.argv);

// Extract command
const args = process.argv.slice(2);
const command = args[0];
console.log(command);

// My app will:
// - create posts
// - list posts
// - view posts
// - delete posts

// Import file system
const fs = require("fs");

// Define file
const DATA_FILE = "blog_posts.json";

// Create helper functions
// Load posts
function loadPosts() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

// Save posts
function savePosts(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

// Build Features One by One
// Build CREATE

function createPost(title, content) {
  const posts = loadPosts();
  const post = {
    id: posts.length + 1,
    title,
    content,
    created_at: new Date().toISOString(),
  };
  posts.push(post);
  savePosts(posts);

  console.log("Post created!");
}

// Build LIST

function listPosts() {
  const posts = loadPosts();

  if (posts.length === 0) {
    console.log("No post found");
  }
  posts.forEach((post) => {
    console.log(`${post.id}. ${post.title}`);
  });
}

// Build VIEW
function viewPost(id) {
  const posts = loadPosts();

  const post = posts.find((p) => p.id === id);

  if (!post) {
    console.log("Post not found");
    return;
  }
  console.log(post.title);
  console.log(post.content);
}

// Build DELETE
function deletePost(id) {
  let posts = loadPosts();

  const newPosts = posts.filter((p) => p.id !== id);

  if (newPosts.length === posts.length) {
    console.log("Post not found");
    return;
  }

  newPosts.forEach((p, i) => (p.id = i + 1));

  savePosts(newPosts);
  console.log("Post deleted");
}

// Connect Everything
//  Add command handler

switch (command) {
  case "create":
    createPost(args[1], args[2]);
    break;

  case "list":
    listPosts();
    break;
  case "view":
    viewPost(parseInt(args[1]));
    break;

  case "delete":
    deletePost(parseInt(args[1]));
    break;

  default:
    console.log("Unknown command");
    break;
}
