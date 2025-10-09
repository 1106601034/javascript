import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as TaskIcon,
  Description as DescriptionIcon,
  PriorityHigh as PriorityIcon,
  Schedule as StatusIcon,
  CalendarToday as DateIcon,
  CheckCircle as CompleteIcon
} from '@mui/icons-material';

function HomePage() {
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="div">
            📋 任务列表
          </Typography>
          <Typography variant="body2" color="text.secondary">
            当前共有 {0} 个任务
          </Typography>
        </Box>

        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="任务列表">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <CompleteIcon fontSize="small" color="action" />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TaskIcon fontSize="small" />
                    任务标题
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <DescriptionIcon fontSize="small" />
                    描述
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <PriorityIcon fontSize="small" />
                    优先级
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <StatusIcon fontSize="small" />
                    状态
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <DateIcon fontSize="small" />
                    截止日期
                  </Box>
                </TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[].map((todo) => {
                const overdue = false;
                return (
                  <TableRow
                    key={todo.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { bgcolor: 'action.hover' },
                      opacity: todo.status === '已完成' ? 0.7 : 1,
                      bgcolor: overdue ? 'error.light' : 'inherit'
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={todo.status === '已完成'}
                        onChange={() => { }}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        sx={{
                          textDecoration: todo.status === '已完成' ? 'line-through' : 'none'
                        }}
                      >
                        {todo.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {todo.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {todo.description}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={todo.priority}
                        color={"black"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={todo.status}
                        color={"black"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        color={overdue ? 'error.main' : 'text.primary'}
                        fontWeight={overdue ? 'bold' : 'normal'}
                      >
                        formatDate
                      </Typography>
                      {overdue && (
                        <Typography variant="caption" color="error.main">
                          已逾期
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="编辑任务">
                        <IconButton
                          size="small"
                          onClick={() => { }}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="删除任务">
                        <IconButton
                          size="small"
                          onClick={() => { }}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* 删除确认对话框 */}
      <Dialog
        open={false}
        onClose={() => { }}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          确认删除任务
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            您确定要删除任务 "{ }" 吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { }}>
            取消
          </Button>
          <Button
            onClick={() => { }}
            color="error"
            variant="contained"
            autoFocus
          >
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default HomePage;