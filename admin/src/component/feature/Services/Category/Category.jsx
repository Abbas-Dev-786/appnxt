import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fetchCategory, removeCategory } from "../../../../services/ServiceService";
import { toast } from "react-toastify";
import Spinner from "../../../shared/Spinner/Spinner";

const Category = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.ServiceDataSlice.category);
    const [isLoading, setIsLoading] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    // Fetch categories on component mount
    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await fetchCategory();
            if (response.success) {
                dispatch({ type: 'ServiceDataSlice/handleFetchCategory', payload: response.data });
            }
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) {
            toast.error('Please enter a category name');
            return;
        }

        setIsLoading(true);
        try {
            const response = await createCategory({ category: newCategory.trim() });
            if (response.success) {
                dispatch({ type: 'ServiceDataSlice/handlePostCategory', payload: newCategory.trim() });
                setNewCategory("");
                toast.success('Category added successfully');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add category');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (categoryName) => {
        try {
            const response = await removeCategory(categoryName);
            if (response.success) {
                dispatch({ 
                    type: 'ServiceDataSlice/handleRemoveCategory', 
                    payload: categoryName 
                });
                toast.success('Category deleted successfully');
            }
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    return (
        <>
            <div className="card my-3">
                <div className="card-header pt-4 pb-2">
                    <div className="flex-cs header">
                        <h6>Categories Management</h6>
                    </div>
                </div>
                <div className="card-body">
                    {/* Add New Category Form */}
                    <div className="d-flex mb-4 gap-3">
                        <input 
                            type="text" 
                            value={newCategory} 
                            onChange={(e) => setNewCategory(e.target.value)}  
                            className='form-control' 
                            placeholder='Enter Category Name' 
                        />
                        <button 
                            type='button' 
                            onClick={handleSubmit}
                            disabled={isLoading} 
                            className='btn btn-primary btn-lg m-0'
                        >
                            Add {isLoading && <Spinner />}
                        </button>
                    </div>

                    {/* Categories List */}
                    <div className="categories-list">
                        <h6 className="mb-3">Existing Categories</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {categories?.map((category, index) => (
                                <div 
                                    key={index} 
                                    className="badge bg-gradient-info d-flex align-items-center gap-2"
                                    style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                                >
                                    {category}
                                    <button 
                                        onClick={() => handleDelete(category)}
                                        className="btn btn-link text-white p-0 ms-2"
                                        type="button"
                                        style={{ fontSize: '1rem', lineHeight: 1 }}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {categories?.length === 0 && (
                            <p className="text-muted">No categories found</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;