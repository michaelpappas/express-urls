"use strict"

const fsP = require("fs/promises");
const readline = require('readline');
const axios = require("axios");
const { read, readFile } = require("fs");
const { parse } = require("path");

/** Reads the lines of file defined by path and return array of lines */
async function parseFile(path){
  let content;

  try{
    content = await fsP.readFile(path, "utf-8")
    let lines = content.toString().split('\n')

    return lines
    }
  catch{
    console.log(`Couldn’t read from: ${path}:`)
    process.exit(1);
  }
}

async function parseUrls(input){

  for(let i=0; i<input.length; i++){
    let tempUrl = input[i]

    await getContent(tempUrl)
  }

}

async function getContent(input){
  let hostname = new  URL(input).hostname

  try{
    let resp = await axios.get(`${input}`)
    await writeContent(resp.data, hostname)
  }
  catch{
    console.log(`Couldn’t download ${hostname}`)
  }

}

async function writeContent(input, fileName){
  try{
    await fsP.writeFile(fileName, input, "utf-8")
    console.log(`Wrote to: ${fileName}`)
  }
  catch{
    console.log(`Couldn’t write to: ${fileName}`)
  }
}

parseFile(process.argv[2]).then(urls => parseUrls(urls))
