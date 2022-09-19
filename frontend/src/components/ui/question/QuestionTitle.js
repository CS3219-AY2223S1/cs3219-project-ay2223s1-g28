import Typography from "@mui/material/Typography";

function QuestionTitle(props) {
  return (
    <Typography
      variant="h3"
      fontWeight="lighter"
      textAlign="center"
      sx={{ mt: "20px" }}
      color="#3EA7A5"
    >
      {props.title}
    </Typography>
  );
}

export default QuestionTitle;
