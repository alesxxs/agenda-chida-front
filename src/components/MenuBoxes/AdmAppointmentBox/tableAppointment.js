import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import InstagramIcon from "@mui/icons-material/Instagram";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useTableAppointment } from "./hooks/useTableAppointment";
import { Button } from "@mui/material";
import DialogComponent from "../../Dialog/dialogComponent";
import FormEditAppointment from "./formEditAppointment";
import { useAppContext } from "../../AppContext/appContext";
import SearchIcon from "@mui/icons-material/Search";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "clientName",
    numeric: false,
    disablePadding: true,
    label: "Nombre",
  },
  {
    id: "lastName",
    numeric: false,
    disablePadding: true,
    label: "Apellido",
  },
  {
    id: "dateCalendar",
    numeric: false,
    disablePadding: true,
    label: "Fecha de Cita",
  },
  {
    id: "timeClock",
    numeric: false,
    disablePadding: true,
    label: "Hora de Inicio",
  },
  {
    id: "timeFinishClock",
    numeric: false,
    disablePadding: true,
    label: "Hora de Termino",
  },
  {
    id: "anticipo",
    numeric: true,
    disablePadding: true,
    label: "Anticipo",
  },
  {
    id: "service",
    numeric: false,
    disablePadding: true,
    label: "Servicio",
  },
  {
    id: "finalPrice",
    numeric: true,
    disablePadding: true,
    label: "Precio Final",
  },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: true,
    label: "Tel",
  },
  {
    id: "instagram",
    numeric: false,
    disablePadding: true,
    label: "Instagram",
  },
  {
    id: "notes",
    numeric: false,
    disablePadding: true,
    label: "Notas",
  },
  {
    id: "edit",
    numeric: false,
    disablePadding: true,
    label: "Editar",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, onRequestSort } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            className="titleBold"
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected === 1
            ? `${numSelected} cita seleccionada`
            : `${numSelected} citas seleccionadas`}
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const TableAppointment = () => {
  const { isLoader } = useAppContext();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState();
  const [infoRow, setInfoRow] = useState({});
  const [infoRowID, setInfoRowID] = useState({});

  const handleClickOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => setOpenDialog(false);

  const { allAppointmentData, handleDelete } = useTableAppointment({
    selected,
    setSelected,
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = allAppointmentData?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - allAppointmentData?.length)
      : 0;

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={allAppointmentData?.length}
          />
          <TableBody>
            {stableSort(allAppointmentData, getComparator(order, orderBy))
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => {
                const isItemSelected = isSelected(row?.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                const formattedTimeInitial = row.initialTime.slice(0, 5);

                const formattedTimeFinish = row.finishTime.slice(0, 5);

                const dateAppointment = new Date(row.initialDate);

                const day = dateAppointment.getDate();
                const month = dateAppointment.getMonth() + 1;
                const year = dateAppointment.getFullYear().toString().slice(-2);

                const formattedDay = day < 10 ? `0${day}` : day;
                const formattedMonth = month < 10 ? `0${month}` : month;

                const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row?.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row?.id)}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      // padding="none"
                      align="center"
                    >
                      {row?.name}
                    </TableCell>
                    <TableCell align="center">{row?.lastName}</TableCell>
                    <TableCell align="center">{formattedDate}</TableCell>
                    <TableCell align="center">{formattedTimeInitial}</TableCell>
                    <TableCell align="center">{formattedTimeFinish}</TableCell>
                    <TableCell align="center">{`$${row?.anticipo}`}</TableCell>
                    <TableCell align="center">{row?.service}</TableCell>
                    <TableCell align="center">{`$${row?.finalPrice}`}</TableCell>
                    <TableCell align="center">{row?.phoneNumber}</TableCell>
                    <TableCell align="center">
                      <a
                        href={`https://www.instagram.com/${row?.instagram}/`}
                        target="_blank"
                      >
                        <InstagramIcon />
                      </a>
                    </TableCell>
                    <TableCell align="center">{row?.notes}</TableCell>
                    <TableCell align="center">
                      <SettingsOutlinedIcon
                        className="click"
                        onClick={() => {
                          setInfoRow(row);
                          setInfoRowID(row.id);
                          handleClickOpenDialog();
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={allAppointmentData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <div className="buttonDelete">
        <div>
          <Button variant="contained" startIcon={<SearchIcon />}>
            Buscar
          </Button>
        </div>
        {selected.length ? (
          <div className="buttonDivDelete">
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={handleDelete}
            >
              Borrar
            </Button>
          </div>
        ) : null}
      </div> */}

      {selected.length ? (
        <div className="buttonDelete">
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={handleDelete}
          >
            Borrar
          </Button>
        </div>
      ) : null}

      <DialogComponent
        open={openDialog}
        handleCloseDialog={handleCloseDialog}
        component={
          <FormEditAppointment
            handleCloseDialog={handleCloseDialog}
            isLoader={isLoader}
            infoRow={infoRow}
            infoRowID={infoRowID}
          />
        }
      />
    </>
  );
};

export default TableAppointment;
