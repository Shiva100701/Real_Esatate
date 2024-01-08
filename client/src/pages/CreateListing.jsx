import React from 'react'

function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Description"
            id="Description"
            required
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Address..."
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap ">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedroom"
                max="10"
                min="1"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                max="10"
                min="1"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                max="10"
                min="1"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className='text-sm'>($ / Months)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                max="10"
                min="1"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className='text-sm'>($ / Months)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
        <p className='font-semibold'>Image: 
        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
        </p>
        <div className="flex gap-4">
            <input className='p-3 border border-gray-300 rounded w-full' type="file" accept='image/*' id="images" multiple />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
        </div>
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing