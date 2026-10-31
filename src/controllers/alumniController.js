import User from '../models/User.js';

export async function getMyProfile(req, res) {
  res.json({ user: req.user });
}

export async function listAlumni(req, res, next) {
  try {
    const { search = '', program = '', batch = '', workingStatus = '' } = req.query;
    const filter = { role: 'alumni' };
    if (program) filter.program = program;
    if (batch) filter.batch = batch;
    if (workingStatus) filter.workingStatus = workingStatus;
    if (search.trim()) {
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [{ fullName: new RegExp(escaped, 'i') }, { email: new RegExp(escaped, 'i') }, { mobile: new RegExp(escaped, 'i') }];
    }
    const alumni = await User.find(filter).select('-passwordHash').sort({ createdAt: -1 }).lean();
    res.json({ alumni, total: alumni.length });
  } catch (error) { next(error); }
}
