const STEPSBURGER = [
  {
    target: '.hamburger__input',
    content: 'Search for your completed and uncompleted tasks.',
    disableBeacon: true,
    placement: 'top',
    floaterProps: {
      disableAnimation: true,
    },
  },
  {
    target: '.credits',
    content: 'Credits are used to add new task',
    disableBeacon: true,
    placement: 'top',
    floaterProps: {
      disableAnimation: true,
    },
  },
  {
    target: '.hamburger_history',
    content: 'You can view all your completed task in the history section',
    placement: 'top',
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true,
    },
  },
  {
    target: '.hamburger_credits',
    content: 'If you run out of credits you can buy more from our shop',
    placement: 'top',
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true,
    },
  },
  {
    target: '.hamburger_contact',
    content:
      'If you have some problems with our app or you just want to send message, got here.',
    placement: 'top',
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true,
    },
  },
  {
    target: '.hamburger_settings',
    content: 'Change account setting, theme or delete your account ',
    placement: 'top',
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true,
    },
  },
];

const STEPSTASK = [
  {
    target: '.todo__taskName',
    content: 'Here you can enter name of task',
    disableScrolling: true,
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true,
    },
  },
  {
    target: '.todo__description',
    content: 'Add description about task',
    disableScrolling: true,
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true,
    },
  },
  {
    target: '.select__diff',
    content: 'Here you can choose priority of task',
    disableBeacon: false,
    disableScrolling: true,
    floaterProps: {
      disableAnimation: true,
    },
  },
  {
    target: '.tour-credits',
    content:
      'Your credits. Notice that you need have at least on credit to add task',
    disableBeacon: true,
    disableScrolling: true,
    floaterProps: {
      disableAnimation: true,
    },
  },
  {
    target: '.btn-newtask',
    content: 'This button adds new task',
    disableBeacon: true,
    floaterProps: {
      disableAnimation: true,
    },
  },
];

export { STEPSBURGER, STEPSTASK };
