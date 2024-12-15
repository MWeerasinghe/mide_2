import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SummaryReport() {
  const [filterType, setFilterType] = useState("grade"); // "grade" or "student"
  const [grades, setGrades] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [timeFilter, setTimeFilter] = useState("date");
  const [chartData, setChartData] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [range, setRange] = useState({ from: "", to: "" });

  const getSundaysInRange = (from, to) => {
    const startDate = new Date(from);
    const endDate = new Date(to);
    const sundays = [];
    startDate.setDate(startDate.getDate() + ((7 - startDate.getDay()) % 7));
    while (startDate <= endDate) {
      sundays.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 7);
    }
    return sundays;
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setGrades([]);
    setStudentId("");
  };

  const handleGradeChange = (event) => setGrades(event.target.value);
  const handleStudentIdChange = (event) => setStudentId(event.target.value);

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
    setRange({ from: "", to: "" });
  };

  const handleRangeChange = (field, value) => {
    setRange((prev) => ({ ...prev, [field]: value }));
  };

  const generateReport = () => {
    if (!range.from || !range.to) return;

    const sundays = getSundaysInRange(range.from, range.to);

    // Simulate fetching data
    const attendanceData = sundays.map(() => {
      if (filterType === "student") {
        // Fetch data for a specific student
        const attendance = Math.floor(Math.random() * 10) + 5;
        const absences = Math.floor(Math.random() * 5);
        return { attendance, absences };
      } else {
        // Fetch data for grades
        const attendance = grades.map(() => Math.floor(Math.random() * 10) + 5);
        const absences = grades.map(() => Math.floor(Math.random() * 5));
        return { attendance, absences };
      }
    });

    const chartLabels = filterType === "student" ? [`Student ${studentId}`] : grades.map((grade) => `Grade ${grade}`);
    const chartDatasets = sundays.map((sunday, i) => ({
      label: sunday.toDateString(),
      data: filterType === "student" ? [attendanceData[i].attendance] : attendanceData[i].attendance,
      backgroundColor: "brown",
    }));

    setChartData({
      labels: chartLabels,
      datasets: chartDatasets,
    });

    const summary =
      filterType === "student"
        ? [{
            studentId,
            data: sundays.map((_, i) => ({
              date: sundays[i].toDateString(),
              present: attendanceData[i].attendance,
              absent: attendanceData[i].absences,
            })),
            totalPresent: attendanceData.reduce((sum, day) => sum + day.attendance, 0),
            totalAbsent: attendanceData.reduce((sum, day) => sum + day.absences, 0),
          }]
        : grades.map((grade, index) => ({
            grade,
            data: sundays.map((_, i) => ({
              date: sundays[i].toDateString(),
              present: attendanceData[i].attendance[index],
              absent: attendanceData[i].absences[index],
            })),
            totalPresent: attendanceData.reduce(
              (sum, day) => sum + day.attendance[index],
              0
            ),
            totalAbsent: attendanceData.reduce(
              (sum, day) => sum + day.absences[index],
              0
            ),
          }));

    setSummaryData(summary);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Summary Report
      </Typography>

      <Paper sx={{ padding: 3, marginTop: 2 }}>
        <FormControl>
          <RadioGroup row value={filterType} onChange={handleFilterTypeChange}>
            <FormControlLabel value="grade" control={<Radio />} label="Filter by Grade" />
            <FormControlLabel value="student" control={<Radio />} label="Filter by Student ID" />
          </RadioGroup>
        </FormControl>

        {filterType === "grade" && (
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Select Grades</InputLabel>
            <Select
              multiple
              value={grades}
              onChange={handleGradeChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  Grade {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {filterType === "student" && (
          <TextField
            label="Student ID"
            fullWidth
            value={studentId}
            onChange={handleStudentIdChange}
            sx={{ marginBottom: 2 }}
          />
        )}

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Filter By</InputLabel>
          <Select value={timeFilter} onChange={handleTimeFilterChange}>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <TextField
            label={`From ${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}`}
            type={timeFilter === "date" ? "date" : timeFilter === "month" ? "month" : "number"}
            InputLabelProps={{ shrink: true }}
            value={range.from}
            onChange={(e) => handleRangeChange("from", e.target.value)}
            fullWidth
          />
          <TextField
            label={`To ${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}`}
            type={timeFilter === "date" ? "date" : timeFilter === "month" ? "month" : "number"}
            InputLabelProps={{ shrink: true }}
            value={range.to}
            onChange={(e) => handleRangeChange("to", e.target.value)}
            fullWidth
          />
        </Box>

        <Button variant="contained" color="primary" onClick={generateReport} fullWidth>
          Generate Report
        </Button>
      </Paper>

      {chartData && (
        <Paper sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Attendance Chart
          </Typography>
          <Bar data={chartData} />
        </Paper>
      )}

      {summaryData.length > 0 && (
        <Paper sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Summary Table
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {filterType === "student" ? (
                    <>
                      <TableCell>Student ID</TableCell>
                      {summaryData[0].data.map((day) => (
                        <TableCell key={day.date}>{day.date}</TableCell>
                      ))}
                      <TableCell>Total Present</TableCell>
                      <TableCell>Total Absent</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>Grade</TableCell>
                      {summaryData[0].data.map((day) => (
                        <TableCell key={day.date}>{day.date}</TableCell>
                      ))}
                      <TableCell>Total Present</TableCell>
                      <TableCell>Total Absent</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {summaryData.map((row) => (
                  <TableRow key={filterType === "student" ? row.studentId : row.grade}>
                    <TableCell>{filterType === "student" ? row.studentId : row.grade}</TableCell>
                    {row.data.map((day) => (
                      <TableCell key={day.date}>
                        Present: {day.present}, Absent: {day.absent}
                      </TableCell>
                    ))}
                    <TableCell>{row.totalPresent}</TableCell>
                    <TableCell>{row.totalAbsent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}