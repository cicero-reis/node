'use strict';

const mongoose = require('mongoose');
const Course = mongoose.model('Course');

// Course Repositories
exports.get = async() => {
    const res = 
        await Course.find({},
            'cursename slug description tags')                        
    return res;
};

exports.getById = async (id) => {
    const res = 
        await Course
        .findById(id);
    return res;
};

exports.getBySlug = async(slug) => {
    const res = 
        await Course
            .findOne({
                slug: slug
            });
    return res;
};

exports.create = async(data) => {
    const course = new Course(data);
    await course.save();
};

exports.update = async(id, data) => {
    await Course
        .findByIdAndUpdate(id, {
            $set: {
                cursename: data.cursename,
                slug: data.slug,
                description: data.description,
                tags: data.tags
            }
        })
};

exports.delete = async(id) => {
    await Course
        .findByIdAndRemove(id);
}