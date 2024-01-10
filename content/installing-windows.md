+++
title = "TODO"
date = "2024-01-10"
description = "TODO."
[taxonomies]
tags = ["pc", "software"]
[extra]
cover_image = "images/TODO.png"
+++

# **UNDER CONSTRUCTION**
---
---
---

Guide for (re)installing Windows.

Guide will be in a VM, steps on bare metal are the same

# Backing up old Data

For reinstall.
Includes pictures/videos, browser data (export it), game settings and saves.
Make sure to get everything

# Create the Installation Medium

USB drive, at least 8 GB. Second PC required.

Warning: creation on macOS can be hit or miss, Windows or Linux preferred.

Three options

## Option 1: MCT

Official tool.

[Windows 11](https://www.microsoft.com/en-us/software-download/windows11)

## Option 2: Rufus

Robust. Can bypass some Windows 11 restrictions in a user-friendly way.

[Rufus](https://rufus.ie/en/)

## Option 3: Ventoy

Multiple ISOs on one drive.
Useful for Tools [MemTest86](https://www.memtest86.com/) or Linux distros.
Some more functionality like preserved space for other data (like normal USB stick).

[Ventoy](https://www.ventoy.net/en/index.html)

# Setting up the UEFI

Confront mainboard manual for specific instructions.
Update if not on newest version, update file can be on installation medium.
For Windows 11: CSM/legacy off, secure boot on, (f)TPM on, enroll factory keys.

# Preparing Drives

Disconnect every drive you don't want Windows installed on.
Plug in installation medium and (re)boot.
In UEFI or during boot, select the usb drive as boot override.

# Installation

## Select Language

![language](/images/windows-install/setup-language.png)

## Product Key

![product key](/images/windows-install/setup-key.png)

License. Can also be skipped for now.
Digital licenses connected to Microsoft accounts can be migrated from an old system later.

When buying licenses, look for CoA sticker or, for OEM, documentation of license origin and transfer. Some sites sell keys only, illegitimate. When going the illegal route, can also use activation scripts (MAS) - free and no data for third parties.

## Choose Version

![version](/images/windows-install/setup-version.png)

Windows 11 Home or Pro

Differences are marginal for gaming use

Then accept the license terms and continue

## Drive Setup

![previous installation](/images/windows-install/setup-disks-written.png)

![drive selection](/images/windows-install/setup-disks-free.png)

Choose custom install

If there are already partitions, delete all.
Press next on free space.

It will install, then reboot. You can remove the installation medium.
If setup starts again, check your boot sequence.

## First Start Setup

![telemetry](/images/windows-install/post-setup-telemetry.png)

Go through installation, Windows will explain things along the way.
Good rule of thumb: say no to everything, be it telemetry, OneDrive or anything else. Opt-out sometimes really hidden.

Tip: needs internet, sometimes drivers are not provided by installation medium. Shift+F10 and `OOBE\BYPASSNRO`

![offline account](/images/windows-install/post-setup-ms-account.png)

![offline oops](/images/windows-install/post-setup-oops.png)

Tip: offline install - type a@a.com for email, then a for password

# Post Installation

![finished](/images/windows-install/finished-install.png)

See [my other post](@/setting-up-windows.md)
