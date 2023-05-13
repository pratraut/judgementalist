import { useContext } from "react";
import { Issue, Severity } from "../services/issues";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { IssuesContext } from "../context/IssuesContext";
import Autocomplete from "./Autocomplete";

function Decision({ issue }: { issue: Issue }) {
  const { issues, updateIssue } = useContext(IssuesContext);

  const decideSeverity = (decidedSeverity: Severity) => {
    updateIssue({ ...issue, decidedSeverity });
  };

  const decideDuplication = (decidedDuplication: string) => {
    updateIssue({ ...issue, decidedDuplication });
  };

  function SeverityDecision({ severity }: { severity: Severity }) {
    const color =
      severity === "high"
        ? "error"
        : severity === "medium"
        ? "warning"
        : "default";

    return (
      <Chip
        size="small"
        sx={{ cursor: "pointer", width: "100%" }}
        onClick={() => decideSeverity(severity)}
        label={severity}
        color={color}
        variant={issue.decidedSeverity === severity ? "filled" : "outlined"}
      />
    );
  }

  return (
    <Box>
      <Card sx={{ height: "180px" }} variant="outlined">
        <CardContent>
          <Typography variant="h5" color="text.bold">
            Decision
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <Typography variant="h6" color="text.bold">
                Severity
              </Typography>
              <Box sx={{ marginTop: "15px" }}>
                <SeverityDecision severity="high" />
                <SeverityDecision severity="medium" />
                <SeverityDecision severity="false" />
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" color="text.bold">
                Duplication
              </Typography>
              <Autocomplete
                onChange={(e) => decideDuplication(e.target.value)}
                id="duplication"
                values={issues.map((e) => e.title)}
                value={issue.decidedDuplication}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Decision;
