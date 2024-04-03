import { Fragment, useEffect, useState, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { useData } from '@/context/DataContext'
import { useCart } from '@/context/CartContext'

import SearchDrawer from '@/components/SearchDrawer'
import MobileMenu from '@/components/MobileMenu'
import ecommerce from '@/assets/ecommerce.svg'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header() {
  const { getAllCategories } = useData()
  const { openCart, cartQuantity } = useCart()

  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const buttonRef = useRef()

  const navigation = [
    {
      id: 'mens',
      name: 'Men',
      sections: [],
    },
    {
      id: 'womens',
      name: 'Women',
      sections: [],
    },
    {
      id: 'generals',
      name: 'General',
      sections: [],
    },
  ]

  async function fetchData() {
    const data = await getAllCategories()
    setCategories(data)
  }

  categories.forEach((category) => {
    if (category.includes('womens-')) {
      navigation[1].sections.push(category.replace('womens-', ''))
    } else if (category.includes('mens-')) {
      navigation[0].sections.push(category.replace('mens-', ''))
    } else {
      navigation[2].sections.push(category)
    }
  })

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <MobileMenu open={open} setOpen={setOpen} navigation={navigation} />

      <header className="sticky top-0 z-50 bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-full px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-20 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-12 w-auto"
                    src={ecommerce}
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                <div className="flex h-full space-x-8">
                  {navigation.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-base font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8"></div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      <div key="Category">
                                        <p
                                          id={`Category-heading`}
                                          className="font-medium text-gray-900"
                                        >
                                          Category
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`Category-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {category.sections.map((item) => (
                                            <li key={item} className="flex">
                                              <Link
                                                to={`products/${
                                                  category.name == 'General'
                                                    ? item
                                                    : `${category.id}-${item}`
                                                }`}
                                                className="hover:text-gray-800 capitalize"
                                                onClick={() =>
                                                  buttonRef.current?.click()
                                                }
                                              >
                                                {item}
                                              </Link>
                                              <Popover.Button ref={buttonRef} />
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <div className="p-2"></div>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <h1 className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium">
                      USD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </h1>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button
                    className="p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setSearchOpen(true)}
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    type="button"
                    onClick={openCart}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-base font-medium text-gray-700 group-hover:text-gray-800">
                      {cartQuantity}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <SearchDrawer searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    </>
  )
}

export default Header
