#!/bin/sh
cd ../
mkdir output
cp -R ./[your-repository-name]/* ./output
cp -R ./[your-repository-name]/* ./output_temp
cp -R ./output_temp ./[your-repository-name]/
cp -R ./output ./[your-repository-name]/
