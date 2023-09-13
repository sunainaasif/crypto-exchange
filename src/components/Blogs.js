import { AddCircleOutline, AddCircleOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const Blogs = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(null)
  const [blogs, setBlogs] = useState([])
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    // console.log('Entered Blog', data)
    setBlogs([...blogs, { ...data, id: blogs.length + 1 }])
    console.log('Entered Blog', blogs)
    reset()
    setOpenModal(false)
  }
  const onSubmitEdit = (data) => {
    const editedBlogs = blogs.map((blog) => {
      if (blog.id === openEditModal.id) {
        console.log('working', data)
        return data
      } else {
        return blog
      }
    })
    console.log('editedBlogs', editedBlogs)
    setBlogs(editedBlogs)
    setOpenEditModal(false);
    reset()
  }
  const handleDelete =(id)=>{
    setBlogs((blogs) => blogs.filter(blog => blog.id !== id ))
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h2">Blogs</Typography>
        <Button onClick={() => setOpenModal(true)}>
          <AddCircleOutlined sx={{ height: '50px', width: '50px' }} />
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blog Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Subtitle</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((singleBlog, key) => (
              <>
                <TableRow>
                  <TableCell>{key}</TableCell>
                  <TableCell>{singleBlog.blogTitle}</TableCell>
                  <TableCell>{singleBlog.blogSubtitle}</TableCell>
                  <TableCell>{singleBlog.author}</TableCell>
                  <TableCell>
                    <Button onClick={() => setOpenViewModal(singleBlog)}>
                      {' '}
                      View{' '}
                    </Button>
                    <Button
                      onClick={() => {
                        setValue('blogTitle', singleBlog.blogTitle)
                        setValue('blogSubtitle', singleBlog.blogSubtitle)
                        setValue('author', singleBlog.author)
                        setValue('blogDescription', singleBlog.blogDescription)
                        setOpenEditModal(singleBlog)
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(singleBlog.id)}> Delete</Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add Blog */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="modalStyling">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Blog
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <FormControl sx={{ marginTop: '20px', width: '100%' }}>
                <InputLabel htmlFor="blogTitle">Blog Title</InputLabel>
                <OutlinedInput
                  id="blogTitle"
                  label="Blog Title"
                  {...register('blogTitle', {
                    required: true,
                  })}
                ></OutlinedInput>
                {errors.blogTitle && (
                  <p className="errorMessage">Enter Title</p>
                )}
              </FormControl>
              <FormControl sx={{ marginTop: '20px', width: '100%' }}>
                <InputLabel htmlFor="blogSubtitle">Subtitle</InputLabel>
                <OutlinedInput
                  id="blogSubtitle"
                  label="Subtitle"
                  {...register('blogSubtitle', {
                    required: true,
                  })}
                ></OutlinedInput>
                {errors.blogTitle && (
                  <p className="errorMessage">Enter Subtitle</p>
                )}
              </FormControl>
              <FormControl sx={{ marginTop: '20px', width: '100%' }}>
                <InputLabel htmlFor="author">Sub Title</InputLabel>
                <OutlinedInput
                  id="author"
                  label="Author"
                  {...register('author', {
                    required: true,
                  })}
                ></OutlinedInput>
                {errors.blogTitle && (
                  <p className="errorMessage">Enter Subtitle</p>
                )}
              </FormControl>
              <FormControl sx={{ marginTop: '20px', width: '100%' }}>
                <InputLabel htmlFor="blogDescription">
                  Blog Description
                </InputLabel>
                <OutlinedInput
                  id="blogDescription"
                  label="Blog Description"
                  {...register('blogDescription', {
                    required: true,
                  })}
                ></OutlinedInput>
                {errors.blogDescription && (
                  <p className="errorMessage">Enter Description</p>
                )}
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: '20px',
                  marginBottom: '20px',
                  backgroundColor: '#1f3850',
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* View Blog */}

      <Modal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalStyling">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {openViewModal?.blogTitle}{' '}
            <span style={{ color: 'gray', fontSize: '14px' }}>
              {' '}
              ({openViewModal?.author})
            </span>
          </Typography>
          <Typography id="modal-modal-subtitle" variant="h6" component="h2">
            {openViewModal?.blogSubtitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {openViewModal?.blogDescription}
          </Typography>
        </Box>
      </Modal>

      {/* --------------------------------Edit Modal-------------------------------------------------- */}
      {/* Edit Blog */}
      <Modal open={openEditModal}>
        <Box className="modalStyling">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Blog
          </Typography>
          <form onSubmit={handleSubmit(onSubmitEdit)}>
            <Box>
              <FormControl sx={{ marginTop: '20px', width: '100%' }}>
                <InputLabel htmlFor="blogTitle">Blog Title</InputLabel>
                <OutlinedInput
                  id="blogTitle"
                  label="Blog Title"
                  {...register('blogTitle', {
                    required: true,
                  })}
                ></OutlinedInput>
                {errors.blogTitle && (
                  <p className="errorMessage">Enter Title</p>
                )}
              </FormControl>
              <FormControl sx={{ marginTop: '20px', width: '100%' }}>
                <InputLabel htmlFor="blogSubtitle">Subtitle</InputLabel>
                <OutlinedInput
                  id="blogSubtitle"
                  label="Subtitle"
                  {...register('blogSubtitle', {
                    required: true,
                  })}
                ></OutlinedInput>
                {errors.blogSubtitle && (
                  <p className="errorMessage">Enter Subtitle</p>
                )}
              </FormControl>
              <FormControl sx={{ marginTop: '20px', width: '100%' }}>
                <InputLabel htmlFor="author">Sub Title</InputLabel>
                <OutlinedInput
                  id="author"
                  label="Author"
                  {...register('author', {
                    required: true,
                  })}
                ></OutlinedInput>
                {errors.author && <p className="errorMessage">Enter Author</p>}
              </FormControl>
              <FormControl sx={{ marginTop: '20px', width: '100%' }}>
                <InputLabel htmlFor="blogDescription">
                  Blog Description
                </InputLabel>
                <OutlinedInput
                  id="blogDescription"
                  label="Blog Description"
                  {...register('blogDescription', {
                    required: true,
                  })}
                ></OutlinedInput>
                {errors.blogDescription && (
                  <p className="errorMessage">Enter Description</p>
                )}
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: '20px',
                  marginBottom: '20px',
                  backgroundColor: '#1f3850',
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default Blogs
