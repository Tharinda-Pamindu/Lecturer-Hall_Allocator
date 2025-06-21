"use client";

import { useState } from "react";
import { MoreHorizontal, PlusCircle, Pen, Trash2 } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FacultyForm } from "@/components/forms/faculty-form";
import { type Faculty } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default function FacultyPage() {
  const { faculty, addFaculty, updateFaculty, deleteFaculty } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | undefined>(undefined);

  const handleAddClick = () => {
    setEditingFaculty(undefined);
    setIsDialogOpen(true);
  };

  const handleEditClick = (facultyMember: Faculty) => {
    setEditingFaculty(facultyMember);
    setIsDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingFaculty(undefined);
  }

  const handleFormSubmit = (data: Faculty) => {
    if (editingFaculty) {
      updateFaculty(editingFaculty.name, data);
    } else {
      addFaculty(data);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <PageHeader
          title="Faculty Management"
          description="Define and manage faculty members and their preferences."
        >
          <Button onClick={handleAddClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Faculty
          </Button>
        </PageHeader>
        <Card>
          <CardHeader>
            <CardTitle>Faculty List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Preferred Halls</TableHead>
                  <TableHead>Preferred Times</TableHead>
                  <TableHead>Max Classes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faculty.length > 0 ? (
                  faculty.map((member) => (
                    <TableRow key={member.name}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.preferredHalls.map(h => <Badge key={h} variant="secondary">{h}</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.preferredTimeSlots.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell>{member.maxClasses}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleEditClick(member)}>
                              <Pen className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteFaculty(member.name)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No faculty found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingFaculty ? "Edit" : "Add"} Faculty</DialogTitle>
          </DialogHeader>
          <FacultyForm
            onSubmit={handleFormSubmit}
            defaultValues={editingFaculty}
            onClose={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
