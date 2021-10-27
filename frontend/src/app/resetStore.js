import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetActivitiesSlice } from '../features/activities/activitySlice';
import { resetBoardSlice } from '../features/boards/boardSlice';
import { resetBoardMenuSlice } from '../features/boardMenu/boardMenuSlice';
import { resetCardActionsMenuSlice } from '../features/cardActionsMenu/cardActionsSlice';
import { resetCardSlice } from '../features/cards/cardSlice';
import { resetListDrawerSlice } from '../features/listDrawer/listDrawerSlice';
import { resetListMenuSlice } from '../features/listMenu/listMenuSlice';
import { resetListsSlice } from '../features/lists/listsSlice';
import { resetModalsSlice } from '../features/modal/modalSlice';
import { resetSearchSlice } from '../features/search/searchSlice';
import { resetSidebarSlice } from '../features/sidebar/sidebarSlice';
import { resetUserSettingsSlice } from '../features/userSettings/userSettingsSlice';

export default function useResetStore() {
  const dispatch = useDispatch();
  const [resetStore, setResetStore] = useState(false);

  useEffect(() => {
    if (resetStore) {
      dispatch(resetActivitiesSlice());
      dispatch(resetBoardSlice());
      dispatch(resetBoardMenuSlice());
      dispatch(resetCardActionsMenuSlice());
      dispatch(resetCardSlice());
      dispatch(resetListDrawerSlice());
      dispatch(resetListMenuSlice());
      dispatch(resetListsSlice());
      dispatch(resetModalsSlice());
      dispatch(resetSearchSlice());
      dispatch(resetSidebarSlice());
      dispatch(resetUserSettingsSlice());
    }
  }, [dispatch, resetStore]);

  return [setResetStore];
}
