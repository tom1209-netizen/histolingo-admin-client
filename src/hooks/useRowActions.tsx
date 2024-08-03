import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateRole } from '../api/roles';

export const useRowActions = () => {
    const navigate = useNavigate();
    const handleSwitchChange = async (id: string, checked: boolean,  name: string, permissions: number[]) => {
      const newStatus = checked ? 1 : 0;
        try {
          const body = {
            name,
            status: newStatus,
            permissions,
          };
          await updateRole(id, body);

          toast.success(`Role status updated to ${checked ? 'active' : 'inactive'}`);
          navigate('/role');
      } catch (error) {
          console.error('Failed to update role status:', error);
          toast.error('Failed to update role status. Please try again.');
      }
    };
  
    const handleEditRow = (id: string) => {
      navigate(`/role/${id}`);
    };
  
    return {
      handleSwitchChange,
      handleEditRow,
    };
  };
  