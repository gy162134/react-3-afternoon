import React, { Component } from "react";
import axios from "axios";
import Post from "./Post/Post.js";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get("HTTPS://practiceapi.devmountain.com/api/posts")
      .then(res => this.setState({ posts: res.data }));
  }

  updatePost(id, text) {
    axios
      .put(`HTTPS://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  deletePost(id) {
    axios
      .delete(`HTTPS://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => this.setState({ posts: res.data }));
  }

  createPost(text) {
    axios
      .post(`HTTPS://practiceapi.devmountain.com/api/posts`, { text })
      .then(res => this.setState({ posts: res.data }));
  }

  render() {
    const { posts } = this.state;
    console.log(this.state.posts);
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(e => (
            <Post
              key={e.id}
              text={e.text}
              date={e.date}
              updatePostFn={this.updatePost}
              id={e.id}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
