/**
    *   ***************************************************************
    *   This module is a personnal used of technoWiz Solution Provider.
    *   Develop by Tomas B. Pajarillaga Jr. RMT, RN, MSIT.
    *   QA By: 
    *       Thomas Emmanuel R. Pajarillaga III.
    *       Benedict Earle Gabriel R. Pajarillaga
    *   ****************************************************************
*/
import axios from 'axios';
import * as swal from 'sweetalert2';
/**
    * Search
    * @param {'Collections'} collection
    * @param {'will accept conditions'} key
    *
    * @return collection of Models
*/
export async function tanong(collection, key = '') {
    if (typeof key === 'object') { key = `?${Object.keys(key).map(i => `${i}=${key[i]}`).join('&')}`; }
    else if (key) { key = `?key=${key}` }

    return await axios.get(`api/${collection}${key}`).then(
        res => { return res.data; },
        err => { console.log(err); }
    )
}
/**
    * Find
    * @param {'Collections'} entity
    * @param {'Primary key'} key
    * @param {'Parameters'}  params
    * @return single Model
*/
export async function hanapin(entity, pk = undefined, params = undefined) {
    const key = params === undefined ? '' : `?${Object.keys(params).map(i => `${i}=${params[i]}`).join('&')}`;
    const url = pk ? `api/${entity}/${pk}/find${key}` : `api/${entity}/find${key}`
    return await axios.get(url).then(
        res => { return res.data; },
        err => { console.log(err); }
    )
}
/**
    * Look
    * @param {'Collections'} entity
    * @param {'Parameters'} params
    *
    * @return single Model
*/
export async function tignan(entity, params) {
    const key = Object.keys(params).map(i => `${i}=${params[i]}`).join('&');
    return await axios.get(`api/${entity}/look?${key}`).then(
        res => { return res.data; },
        err => { console.log(err); }
    )
}
/**
    * list
    * @param {'Collections'} entity
    * @param {'will accept conditions'} key
    *
    * @return List the Models
*/
export async function listahan(entity, key = '') {
    if (typeof key === 'object') { key = `?${Object.keys(key).map(i => `${i}=${key[i]}`).join('&')}`; }
    else if (key) { key = `?key=${key}` }
    else { key = `` }
    return await axios.get(`api/${entity}/list${key}`).then(
        res => { return res.data; },
        err => { console.log(err); }
    )
}
/**
    * save
    * @param {'Collections'} entity
    * @param {'Parameters'} params
    * @param {'has Message'} withMsge
    *
    * @return Updated Model
*/
export async function itala(entity, params, withMsge = true) {
    return await axios.post(`api/${entity}/save`, params)
        .then(res => {
            if (withMsge) { swal.fire({ position: 'center', icon: 'success', title: 'Successfully saved!', showConfirmButton: false, timer: 1500 }) }
            return res.data;
        })
        .catch(err => { console.log(err); })
}
/**
    * update
    * @param {'Collections'} entity
    * @param {'Primary key'} pk
    * @param {'Parameters'} params
    * @param {'has message'} withMsge
    *
    * @return Updated Model
*/
export async function baguhin(entity, pk, params, withMsge = true) {
    return await axios.put(`api/${entity}/${pk}/update`, params)
        .then(res => {
            if (withMsge) { swal.fire({ position: 'center', icon: 'success', title: 'Successfully updated!', showConfirmButton: false, timer: 1500 }) }
            return res.data;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}
/**
    * updateOrCreate
    * @param {'Collections'} entity
    * @param {'parameters'} params
    * @param {'has message'} withMsge
    *
    * @return Updated or Create the Model
*/
export async function baguhinOitala(entity, params) {
    return await axios.put(`api/${entity}/updateOrCreate`, params, { validateStatus: () => true })
        .then(res => res)
        .catch(err => { console.log(err); })
}
/**
    * softdelete
    * @param {'Collections'} entity
    * @param {'Primary key'} pk
    * @param {'Message'} msge
    * @param {'Supporting details'} text
    * @param {'has message'} withMsge
    * @return boolean
*/
export async function itago(entity, pk, msge = 'Are you sure?', text = "You won't be able to revert this!", withMsge = true) {
    return await swal.fire({
        title: msge,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            return await axios.delete(`api/${entity}/${pk}/destroy`)
                .then(() => {
                    if (withMsge) { swal.fire({ position: 'center', icon: 'success', title: 'Poof! Your file has been deleted!', showConfirmButton: false, timer: 1500 }) }
                    return true;
                })
                .catch(err => { console.log(err); })
        } else {
            swal.fire({ position: 'center', title: 'Your file is safe!', showConfirmButton: false, timer: 1500 })
            return false;
        }
    });
}
