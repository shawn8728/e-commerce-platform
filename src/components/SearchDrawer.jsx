import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function SearchDrawer(props) {
  const { searchOpen, setSearchOpen } = props
  const [searchText, setSearchText] = useState('')

  function handleSearch(e) {
    e.preventDefault()

    console.log(searchText)
  }

  return (
    <Transition.Root show={searchOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setSearchOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-x-0 top-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-y-full"
                enterTo="-translate-y-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="-translate-y-0"
                leaveTo="-translate-y-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-h-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setSearchOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-row overflow-y-scroll bg-white py-8 shadow-xl justify-between">
                    <div className="px-4 w-full sm:px-6">
                      <form
                        className="max-w-3xl mx-auto"
                        onSubmit={handleSearch}
                      >
                        <label
                          htmlFor="search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only"
                        >
                          Search
                        </label>
                        <div className="flex content-center">
                          <div className="p-4">
                            <MagnifyingGlassIcon
                              className="h-8 w-8"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            type="search"
                            id="search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                            placeholder="Search"
                            onChange={(e) => setSearchText(e.target.value)}
                            required
                          />
                        </div>
                      </form>
                    </div>
                    <div className="flex px-4 sm:px-6">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300"
                        onClick={() => setSearchOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SearchDrawer
