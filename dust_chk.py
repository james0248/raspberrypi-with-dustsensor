# -*- coding: utf-8 -*-

import serial
import sys
from PMS7003 import PMS7003

dust = PMS7003()

# Baud Rate
Speed = 9600

# UART / USB Serial
USB0 = '/dev/ttyUSB0'
UART = '/dev/ttyAMA0'

# USE PORT
SERIAL_PORT = USB0

#serial setting
ser = serial.Serial(SERIAL_PORT, Speed, timeout = 1)


buffer = ser.read(1024)

if(dust.protocol_chk(buffer)):
  data = dust.unpack_data(buffer)
  dust.print_serial(buffer)

else:
  print ("data read Err")

ser.close()
