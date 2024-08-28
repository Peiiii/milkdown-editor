import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";

// We have some themes for you to choose
import "@milkdown/crepe/theme/frame.css";

const crepe = new Crepe({
  root: document.getElementById("app"),
  defaultValue: "Hello, Milkdown!",
});

crepe.create().then(() => {
  console.log("Editor created");
});
