export interface ISound {
  id: number
  tag: string
  description: string
  size: number
  created: string
  modified: string
}

export interface ISoundWithPagers extends IPager {
  sound: ISound[]
}

export interface SoundListState {
  columnsToShow: IColType<ISound>[]
  showAddSound: boolean
  showEditSound: boolean
  showError: boolean
  error: string
  pageLength: number
  currentPageIndex: number
  currentSound: Pick<ISound, "id" | "tag" | "description">
}

export interface CreateSound {
  tag: string
  error: string
  description: string
  uploadingFile: boolean
  showError: boolean
  file: any
  filePath: string
}

export interface EditSound {
  tag: string
  description: string
  error: string
  showError: boolean
  updatingSoundFile: boolean
  downloadingSoundFile: boolean
  successMessage: string
  uploadedFile: any
  uploadedFilePath: string
  downloadedFile: any
  deletingSound: boolean
  showDeleteDialog: boolean
}
