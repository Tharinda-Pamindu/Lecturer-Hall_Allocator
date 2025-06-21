"use client";

import React, { createContext, useState, useContext, type ReactNode, useCallback } from 'react';
import { type Faculty, type Hall, type Schedule, type ScheduleEntry } from '@/lib/types';
import { initialFaculty, initialHalls } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface AppContextType {
  faculty: Faculty[];
  addFaculty: (facultyMember: Faculty) => void;
  updateFaculty: (name: string, updatedFaculty: Faculty) => void;
  deleteFaculty: (name: string) => void;
  halls: Hall[];
  addHall: (hall: Hall) => void;
  updateHall: (name: string, updatedHall: Hall) => void;
  deleteHall: (name: string) => void;
  schedule: Schedule | null;
  setSchedule: (schedule: Schedule | null) => void;
  updateScheduleEntry: (index: number, entry: ScheduleEntry) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [halls, setHalls] = useState<Hall[]>(initialHalls);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const { toast } = useToast();

  const addFaculty = useCallback((facultyMember: Faculty) => {
    setFaculty(prev => [...prev, facultyMember]);
    toast({ title: "Faculty Added", description: `${facultyMember.name} has been added.` });
  }, [toast]);

  const updateFaculty = useCallback((name: string, updatedFaculty: Faculty) => {
    setFaculty(prev => prev.map(f => f.name === name ? updatedFaculty : f));
    toast({ title: "Faculty Updated", description: `${updatedFaculty.name}'s details have been updated.` });
  }, [toast]);
  
  const deleteFaculty = useCallback((name: string) => {
    setFaculty(prev => prev.filter(f => f.name !== name));
    toast({ title: "Faculty Removed", description: `${name} has been removed.` });
  }, [toast]);

  const addHall = useCallback((hall: Hall) => {
    setHalls(prev => [...prev, hall]);
    toast({ title: "Hall Added", description: `${hall.name} has been added.` });
  }, [toast]);

  const updateHall = useCallback((name: string, updatedHall: Hall) => {
    setHalls(prev => prev.map(h => h.name === name ? updatedHall : h));
    toast({ title: "Hall Updated", description: `${updatedHall.name}'s details have been updated.` });
  }, [toast]);
  
  const deleteHall = useCallback((name: string) => {
    setHalls(prev => prev.filter(h => h.name !== name));
    toast({ title: "Hall Removed", description: `${name} has been removed.` });
  }, [toast]);

  const updateScheduleEntry = useCallback((index: number, entry: ScheduleEntry) => {
    setSchedule(prev => {
        if (!prev) return null;
        const newSchedule = [...prev.schedule];
        newSchedule[index] = entry;
        return { ...prev, schedule: newSchedule };
    });
    toast({ title: "Schedule Updated", description: `The entry for ${entry.courseName} has been updated.` });
  }, [toast]);

  const value = {
    faculty,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    halls,
    addHall,
    updateHall,
    deleteHall,
    schedule,
    setSchedule: (newSchedule: Schedule | null) => setSchedule(newSchedule),
    updateScheduleEntry
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
