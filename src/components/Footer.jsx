import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

function Footer() {
  return (
    <footer className="p-4 sm:p-6 w-full">
      <div className="p-4 sm:p-6 mx-auto">
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024{' '}
            <a
              href="https://www.linkedin.com/in/shawn8728"
              target="_blank"
              className="hover:underline"
            >
              Shawn Wang™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="https://www.linkedin.com/in/shawn8728"
              target="_blank"
              className="text-gray-500 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a
              href="https://github.com/shawn8728"
              target="_blank"
              className="text-gray-500 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
            <a
              href="mailto:yhwang8728@gmail.com"
              target="_blank"
              className="text-gray-500 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
