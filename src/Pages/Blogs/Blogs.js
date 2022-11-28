import React from 'react';

const Blogs = () => {
    return (
        <div className='px-2'>
            <div className='mb-3'>
                <h1 className='text-3xl uppercase font-bold mt-8'>Blogs Questions</h1>
                <p className='text-md'>Learn More About Those</p>
            </div>
            <div className='mb-2'>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        What are the different ways to manage a state in a React application?
                    </div>
                    <div className="collapse-content">
                        <p>The Four Kinds of React State to Manage thats are Local state. Global state. Server state. URL state</p>
                    </div>
                </div>
            </div>
            <div className='mb-2'>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        How does prototypical inheritance work?
                    </div>
                    <div className="collapse-content">
                        <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                    </div>
                </div>
            </div>
            <div className='mb-2'>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        What is a unit test? Why should we write unit tests?
                    </div>
                    <div className="collapse-content">
                        <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </div>
                </div>
            </div>
            <div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        React vs. Angular vs. Vue?
                    </div>
                    <div className="collapse-content">
                        <p>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;