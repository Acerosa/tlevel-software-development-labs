# 01 Library management

## Overview

Two teams build parts of a library system independently, then integrate their work. Team A owns the book catalogue. Team B owns borrowing.

## Learning objectives

- Split a system into team responsibilities and implement one part.
- Validate input before data is stored or changed.
- Integrate two independently built parts into one working system.
- Test the integrated behaviour.

## Requirements

The finished system must let a library keep a catalogue of books and record borrowing.

- Add, edit and delete books, and reject invalid book information.
- Borrow and return books, calculate return dates, and reject invalid borrowing.
- The two parts must work together after integration.

## Team responsibilities

**Team A — Book catalogue**

- Add books.
- Edit book details.
- Delete books.
- Validate book information.

**Team B — Borrowing system**

- Borrow books.
- Return books.
- Calculate return dates.
- Prevent invalid borrowing.

Teams complete their own part first. They then integrate the catalogue and the borrowing system.

## How to run

The starter application is not in this repository yet. When it is added, it will be in `starter/`. Copy that folder into your own working copy and follow the instructions included with it.

## Expected deliverables

- Team A's catalogue features.
- Team B's borrowing features.
- An integrated build that uses both parts.
- Tests covering the team features and the integration.
