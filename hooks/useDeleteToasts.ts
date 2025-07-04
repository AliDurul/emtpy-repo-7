import { useAppDispatch } from "@/lib/hooks";
import { PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const useDeleteToasts = () => {

  type DeletionFunction = (id: any) => Promise<{ message?: string; error?: string; remainingData?: any }>;

  type UpdateAction<T> = (data: T) => { payload: T; type: string; };

  const dispatch = useAppDispatch();

  const deleteToast = async <T>(id: string, deletionFunction: DeletionFunction, updateAction: UpdateAction<T>): Promise<boolean> => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Delete",
        padding: "2em",
        customClass: "sweet-alerts",
      });

      if (result.isConfirmed) {
        const res = await deletionFunction(id);
        console.log('27 -', res);

        if (res?.message) {
          dispatch(updateAction(res.remainingData ?? []));
          await Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            customClass: "sweet-alerts",
          });
          return true;
        } else {
          await Swal.fire({
            title: "Error",
            text: res?.error,
            icon: "error",
            customClass: "sweet-alerts",
          });
          return false;
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred.",
        icon: "error",
        customClass: "sweet-alerts",
      });
    }
    return false;
  };


  //@ts-ignore
  const multiDeleteToast = async (ids: any, deletionFunction: DeletionFunction, updateAction: UpdateAction): Promise<boolean> => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Delete",
        padding: "2em",
        customClass: "sweet-alerts",
      });

      if (result.isConfirmed) {
        const res = await deletionFunction(ids);


        if (res?.message) {
          dispatch(updateAction(res.remainingData ?? []));

          await Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            customClass: "sweet-alerts",
          });
          return true;
        } else {
          await Swal.fire({
            title: "Error",
            text: res?.error,
            icon: "error",
            customClass: "sweet-alerts",
          });
          return false;
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred.",
        icon: "error",
        customClass: "sweet-alerts",
      });
    }
    return false;
  };

  return { deleteToast, multiDeleteToast };
};

export default useDeleteToasts;
