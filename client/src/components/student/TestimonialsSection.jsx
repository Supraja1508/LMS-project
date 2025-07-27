import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialsSection = () => {
  return (
    <div className='pb-14 px-8 md:px-0'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='md:text-base text-gray-500 mt-3'>
        Real stories from students who transformed their careers with Skillnest, and how our <br />
        platform has made a difference in their lives.
      </p>

      <div className='flex flex-wrap justify-center gap-8 mt-14'>

        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className='border border-gray-500/20 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden w-full max-w-[250px]'>
            
            {/* Profile section */}
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-100'>
              <img
                className='h-12 w-12 rounded-full object-cover'
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h3 className='text-lg font-semibold text-gray-800'>{testimonial.name}</h3>
                <p className='text-sm text-gray-600'>{testimonial.role}</p>
              </div>
            </div>

            {/* Star + Feedback section */}
            <div className='px-5 pt-4 pb-6 text-sm text-gray-600 text-left mb-1'>
              {/* Star Rating */}
              <div className='flex gap-1 mb-3'>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt='star'
                    className='h-5'
                  />
                ))}
              </div>

              {/* Feedback */}
              <p className='leading-relaxed mt-5'>{testimonial.feedback}</p>
            </div>
            <a href="#" className='text-blue-500 underline hover:text-blue-800 block text-left px-5 mb-6'>Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
