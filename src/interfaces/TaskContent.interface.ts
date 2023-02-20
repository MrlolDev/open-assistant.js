import TaskLabels from "./TaskLabels.interface.js";

export default interface TaskContent {
  text: string;
  labels?: TaskLabels;
}
