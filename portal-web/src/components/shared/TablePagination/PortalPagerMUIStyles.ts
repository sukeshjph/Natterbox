import { makeStyles } from "@material-ui/core/styles"

export const pagerStyles = makeStyles({
  toolbar: {
    height: "30px",
    minHeight: "25px",
  },
  actions: {
    height: "30px",
    "& .MuiButtonBase-root": {
      height: "30px",
      padding: "5px 12px",
    },
  },
})
