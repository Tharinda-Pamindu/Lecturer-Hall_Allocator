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
} from "@/components/ui/dialog";
import { HallForm } from "@/components/forms/hall-form";
import { type Hall } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default function HallsPage() {
  const { halls, addHall, updateHall, deleteHall } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHall, setEditingHall] = useState<Hall | undefined>(undefined);

  const handleAddClick = () => {
    setEditingHall(undefined);
    setIsDialogOpen(true);
  };

  const handleEditClick = (hall: Hall) => {
    setEditingHall(hall);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingHall(undefined);
  }

  const handleFormSubmit = (data: Hall) => {
    if (editingHall) {
      updateHall(editingHall.name, data);
    } else {
      addHall(data);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <PageHeader
          title="Hall Management"
          description="Input and manage available halls with their attributes."
        >
          <Button onClick={handleAddClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Hall
          </Button>
        </PageHeader>
        <Card>
          <CardHeader>
            <CardTitle>Hall List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Available Times</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {halls.length > 0 ? (
                  halls.map((hall) => (
                    <TableRow key={hall.name}>
                      <TableCell className="font-medium">{hall.name}</TableCell>
                      <TableCell>{hall.capacity}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {hall.availableTimes.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {hall.equipment.map(e => <Badge key={e} variant="secondary">{e}</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleEditClick(hall)}>
                              <Pen className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteHall(hall.name)}
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
                    <TableCell colSpan={5} className="text-center h-24">
                      No halls found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingHall ? "Edit" : "Add"} Hall</DialogTitle>
          </DialogHeader>
          <HallForm
            onSubmit={handleFormSubmit}
            defaultValues={editingHall}
            onClose={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
