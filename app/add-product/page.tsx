import React from "react";

function AddProductPage() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold ">Add Product</h1>
      <form action="">

      <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
          />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
          />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
          />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
          />
          <button className="btn btn-primary btn-block"></button>
          </form>

    </div>
  );
}

export default AddProductPage;
