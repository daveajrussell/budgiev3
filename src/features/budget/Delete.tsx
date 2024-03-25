import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { Button } from "../../components/Button";
import { useAppDispatch } from "../../app/hooks";
import { deleteEntry } from "./budgetSlice";

type DeleteProps = {
  id: string;
  isOpen: boolean;
  closeModal: Function;
};

export const Delete = ({ id, isOpen, closeModal }: DeleteProps) => {
  const dispatch = useAppDispatch();

  function onDelete() {
    dispatch(deleteEntry(id));
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete budget entry
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This will permanently delete this budget entry.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-x-6">
                    <Button
                      text="Cancel"
                      type="button"
                      color="secondary"
                      onClick={closeModal}
                    ></Button>
                    <Button
                      text="Delete"
                      type="submit"
                      color="delete"
                      onClick={onDelete}
                    ></Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
