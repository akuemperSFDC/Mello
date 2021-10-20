import { Menu } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteListAsync } from '../../../../features/lists/listsSlice';
import PanelCopyList from './PanelCopyList';
import PanelMain from './PanelMain';
import PanelMoveList from './PanelMoveList';

const ListMenu = ({ anchorEl, handleClose, open, list }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { mainMenu, copyMenu, moveMenu } = useSelector(
    (state) => state.listMenu
  );

  const handleDelete = () => {
    dispatch(deleteListAsync({ id: list._id, boardId: id }));
  };

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={handleClose}
      open={open}
      sx={{ '& .MuiList-root': { p: 0 } }}
    >
      {/* Main panel */}
      {mainMenu && (
        <PanelMain handleDelete={handleDelete} handleClose={handleClose} />
      )}
      {/* Add card */}
      {/* Copy list panel */}
      {copyMenu && <PanelCopyList handleClose={handleClose} list={list} />}
      {/* Move list panel */}
      {moveMenu && <PanelMoveList handleClose={handleClose} list={list} />}
    </Menu>
  );
};

export default ListMenu;
