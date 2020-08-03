import React from 'react';
import {
  ExtendedPriorityType
} from '@puddle/components';

export interface FilesViewContextType {
  selectFiles: (ids: number[]) => void
  deselectFiles: (ids: number[]) => void
  isSelected: (id: number) => boolean
  setFilePriorities: (files: number[], p: ExtendedPriorityType) => void
}

export const FilesViewContext =
  React.createContext<FilesViewContextType>(
    {} as FilesViewContextType)
