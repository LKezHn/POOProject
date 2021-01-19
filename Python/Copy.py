#-*- coding: utf-8 -*-
import shutil,sys,os

class CopyFile:
    def __init__(self):
        pass

    def moveSong(self,actualPath,toMovePath):
        shutil.copy(actualPath,toMovePath)

    def deletePrevious(self,toMovePath):
        dirlist = os.listdir(toMovePath)
        for item in dirlist:
            if item.endswith(".mp3"):
                os.remove(os.path.join(toMovePath,item))

actualPath = sys.argv[1]
toMovePath = sys.argv[2]
(CopyFile()).deletePrevious(toMovePath)
(CopyFile()).moveSong(actualPath,toMovePath)
