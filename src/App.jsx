import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import ProjectSidebar from "./components/PRojectsidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });
  
  function handleAddTask(text){
    setProjectsState((prevState) => {
      const TaskId = Math.random(); // Generate a unique ID
      const newTask = {
        text:text,
        projectId:prevState.selectedProjectId,
        id: TaskId,
      };
      return {
        ...prevState,
        tasks:[newTask,...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id){
    setProjectsState((prevState) => {
      return{
      ...prevState,
      tasks: prevState.tasks.filter((task) =>task.id !== id),
      }
    });

  }

  function handleSelectedProject(id) {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random().toString(); // Generate a unique ID
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
    }));
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = (
      <NoProjectSelected onStartAddProject={handleStartAddProject} />
    );
  } else if (selectedProject) {
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
      onStartAddProject={handleStartAddProject}
      projects={projectsState.projects}
      onSelectProject={handleSelectedProject}
      selectedProjectId={projectsState.selectedProjectId}
    />
      {content}
    </main>
  );
}

export default App;
