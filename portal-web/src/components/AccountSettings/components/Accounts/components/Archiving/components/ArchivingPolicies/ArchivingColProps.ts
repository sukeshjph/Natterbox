import { OrgPolicy } from "../../Archiving.type"

export const ArchivingColProps: IColType<OrgPolicy>[] = [
  {
    key: "Name",
    label: "Policy Name",
    show: true,
  },
  {
    key: "RetentionMin",
    label: "Minimum Retention Period",
    show: true,
  },
  {
    key: "RetentionMax",
    label: "Maximum Retention Period",
    show: true,
  },
  {
    key: "Mode",
    label: "Mode",
    show: true,
  },
  {
    key: "Version",
    label: "Version",
    show: true,
  },
  {
    key: "Description",
    label: "Description",
    show: true,
  },
]
