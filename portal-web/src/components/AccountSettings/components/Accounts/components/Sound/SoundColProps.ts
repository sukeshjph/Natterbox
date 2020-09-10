import { parseISO, format } from "date-fns"
import { ISound } from "./Sound.type"

export const SoundColProps: IColType<ISound>[] = [
  {
    key: "id",
    label: "Id",
    show: true,
  },
  {
    key: "tag",
    label: "Tag",
    show: true,
  },
  {
    key: "description",
    label: "Description",
    show: true,
  },
  {
    key: "size",
    label: "Size",
    show: true,
  },
  {
    key: "created",
    label: "Created",
    show: true,
    render: colData => format(parseISO(colData), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    key: "modified",
    label: "Modified",
    show: true,
    render: colData => format(parseISO(colData), "yyyy-MM-dd HH:mm:ss"),
  },
]
