import { Transition, Dialog } from "@headlessui/react";
import { Form, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { Button } from "../../components/Button";

type DeleteProps = {
  id: string;
  isOpen: boolean;
  closeModal: Function;
};

export const Delete = ({ id, isOpen, closeModal }: DeleteProps) => {
  const { pathname } = useLocation();
  const action = pathname.indexOf(id) >= 0 ? "destroy" : `${id}/destroy`;
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
                    Delete category
                  </Dialog.Title>
                  <Form method="post" action={action}>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        This will permanently delete this category and you will
                        no longer be able to use it in any budgets.
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-x-6">
                      <Button
                        text="Cancel"
                        type="button"
                        thing="secondary"
                        onClick={closeModal}
                      ></Button>
                      <Button
                        text="Delete"
                        type="submit"
                        thing="delete"
                        onClick={closeModal}
                      ></Button>
                    </div>
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
