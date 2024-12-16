import React, { useState, useEffect } from "react";
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
  const [attendanceData, setAttendanceData] = useState([]);

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

  useEffect(() => {
    // Fetch attendance data on component mount
    fetch("http://localhost:3000/api/school/attendance-data")
      .then((response) => response.json())
      .then((data) => {
        setAttendanceData(data.data); // Update state with the fetched data
      })
      .catch((error) => console.error("Error fetching attendance data:", error));
  }, []);

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

    // Filter the attendance data based on selected student/grade and date range
    const filteredData = attendanceData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= new Date(range.from) && entryDate <= new Date(range.to);
    });

    const chartLabels = filterType === "student" ? [`Student ${studentId}`] : grades.map((grade) => `Grade ${grade}`);
    const chartDatasets = sundays.map((sunday, i) => {
      const dailyAttendance = filteredData.filter((entry) => new Date(entry.date).getTime() === sunday.getTime());
      const attendance = dailyAttendance.map((entry) => entry.grade === grades[i] && entry.name === studentId ? 1 : 0).reduce((a, b) => a + b, 0);
      return {
        label: sunday.toDateString(),
        data: filterType === "student" ? [attendance] : attendance,
        backgroundColor: "brown",
      };
    });

    setChartData({
      labels: chartLabels,
      datasets: chartDatasets,
    });

    const summary =
      filterType === "student"
        ? [
            {
              studentId,
              data: sundays.map((_, i) => ({
                date: sundays[i].toDateString(),
                present: filteredData[i] ? filteredData[i].time : 0, // You can adjust the logic to check attendance status
                absent: filteredData[i] ? 0 : 1,
              })),
              totalPresent: filteredData.length,
              totalAbsent: sundays.length - filteredData.length,
            },
          ]
        : grades.map((grade, index) => ({
            grade,
            data: sundays.map((_, i) => ({
              date: sundays[i].toDateString(),
              present: filteredData[i] ? filteredData[i].time : 0,
              absent: filteredData[i] ? 0 : 1,
            })),
            totalPresent: filteredData.filter((entry) => entry.grade === grade).length,
            totalAbsent: sundays.length - filteredData.filter((entry) => entry.grade === grade).length,
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
                  <TableRow key={row.studentId || row.grade}>
                    <TableCell>{row.studentId || row.grade}</TableCell>
                    {row.data.map((day) => (
                      <TableCell key={day.date}>
                        {day.present > 0 ? "Present" : "Absent"}
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
