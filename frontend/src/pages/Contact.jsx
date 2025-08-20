
import contactData from '../data/contact.json' 

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          CONTACT <span className='text-gray-700 font-semibold'>US</span>
        </p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img
          className='w-full md:max-w-[360px]'
          src={contactData.contact_image}
          alt="Contact"
        />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>
            {contactData.office.title}
          </p>
          <p className='text-gray-500' style={{ whiteSpace: 'pre-line' }}>
            {contactData.office.address}
          </p>
          <p className='text-gray-500'>
            Tel: {contactData.office.tel} <br /> Email: {contactData.office.email}
          </p>

          <p className='font-semibold text-lg text-gray-600'>
            {contactData.careers.title}
          </p>
          <p className='text-gray-500'>{contactData.careers.description}</p>

          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
