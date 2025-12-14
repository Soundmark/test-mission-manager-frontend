import globalModel from '@/models/global';
import { useSelector } from '@umijs/max';
import { useEffect } from 'react';
import RoleInfo from './RoleInfo';
import SelectRole from './SelectRole';
import { useGetTeamList } from './service';

function Index() {
  const { role } = useSelector(globalModel.selector);

  const { run: getTeamList, data: teamList } = useGetTeamList();

  useEffect(() => {
    getTeamList();
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      {!role ? (
        <SelectRole teamList={teamList}></SelectRole>
      ) : (
        <RoleInfo teamList={teamList}></RoleInfo>
      )}
    </div>
  );
}

export default Index;
