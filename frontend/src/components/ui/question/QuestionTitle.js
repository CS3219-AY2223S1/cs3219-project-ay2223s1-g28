import Typography from "@mui/material/Typography";

function QuestionTitle({title}) {
  return (
    <Typography
      variant="h3"
      fontWeight="lighter"
      sx={{ mt: "20px" }}
      color="#3EA7A5"
    >
      {title}
    </Typography>
  );
}

export default QuestionTitle;
