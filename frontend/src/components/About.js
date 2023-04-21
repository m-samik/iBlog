import React from "react";

export default function About() {
  return (
    <div className="container py-5" style={{height: '100vh'}} >
      <h1 className="my-3 text-center">About Page</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <p className="lead text-center">
            Welcome to iBlog, a place where we believe in the power of words and ideas. We are passionate about creating a space for people to share their stories, experiences, and perspectives. We believe that everyone has a story to tell and that by sharing our unique perspectives, we can learn from one another and grow as individuals and as a community.
          </p>
          <p className="lead text-center">
            Our mission is to provide a platform for bloggers from all walks of life to express themselves and connect with others. Whether you're a seasoned writer or just starting out, we welcome you to share your voice with our community.
          </p>
          <p className="lead text-center">
            At iBlog, we believe in the power of diversity and inclusion. We strive to create a safe and welcoming space for people of all backgrounds and identities. We believe that by embracing our differences, we can learn from one another and build a stronger, more compassionate community.
          </p>
          <p className="lead text-center">
            Thank you for being a part of iBlog. We are excited to see the stories and ideas that will be shared and the connections that will be made. Let's inspire one another and create a better world through the power of our words.
          </p>
        </div>
      </div>
    </div>
  );
}
