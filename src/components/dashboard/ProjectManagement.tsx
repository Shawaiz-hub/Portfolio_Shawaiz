
import { useState } from "react";
import { PlusCircle, Trash2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  createdAt: Date;
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with admin dashboard and payment processing.",
      link: "https://example.com/project1",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      createdAt: new Date("2023-02-15")
    },
    {
      id: "2",
      title: "Personal Blog",
      description: "A responsive blog with content management system and newsletter integration.",
      link: "https://example.com/project2",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      createdAt: new Date("2023-04-22")
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    link: "",
    imageUrl: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProject = () => {
    // Validate inputs
    if (!newProject.title || !newProject.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      createdAt: new Date()
    };

    setProjects(prev => [project, ...prev]);
    setNewProject({
      title: "",
      description: "",
      link: "",
      imageUrl: ""
    });

    toast.success("Project added successfully");
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast.success("Project deleted successfully");
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>
            Create a new project to showcase in your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Project Title"
                value={newProject.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Project Description"
                value={newProject.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Project Link</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <LinkIcon className="h-4 w-4" />
                  </div>
                  <Input
                    id="link"
                    name="link"
                    placeholder="https://example.com"
                    value={newProject.link}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={newProject.imageUrl}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddProject} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </CardFooter>
      </Card>

      <div>
        <h3 className="text-lg font-medium mb-4">Existing Projects</h3>
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/4 h-48 sm:h-auto relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex flex-col h-full">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                      <p className="text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <LinkIcon className="h-3 w-3 mr-1" />
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {project.link}
                        </a>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Added on {project.createdAt.toLocaleDateString()}
                      </span>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
