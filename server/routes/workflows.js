import { Router } from 'express';
import { requireRole, requireUser } from '../security/authorization.js';
import { addTicketMessage, canReadTicket, createAnnouncement, createTicket, getTicket, listDepartmentTickets, listMyTickets, listStudentFeed, updateTicketStatus } from '../repositories/workflowRepository.js';
const fail = (response, status, code, message) => response.status(status).json({ error: { code, message } });
function text(value) { return String(value ?? '').trim(); }
export function createFeedRouter(db) {
  const router = Router();
  router.get('/', requireRole('student','staff'), (req,res) => res.json({ items: listStudentFeed(db) }));
  return router;
}
export function createTicketsRouter(db) {
  const router = Router();
  router.use(requireRole('student','staff'));
  router.get('/', (req,res) => res.json({ items: req.user.role === 'staff' ? listDepartmentTickets(db,req.user.departmentId) : listMyTickets(db,req.user.id) }));
  router.post('/', requireRole('student'), (req,res) => {
    const subject = text(req.body?.subject); const message = text(req.body?.message); const serviceId = text(req.body?.serviceId);
    if (subject.length < 4 || subject.length > 120) return fail(res,400,'INVALID_SUBJECT','Subject must be 4 to 120 characters.');
    if (message.length < 10 || message.length > 2000) return fail(res,400,'INVALID_MESSAGE','Message must be 10 to 2000 characters.');
    const id = createTicket(db,req.user,{serviceId,subject,message});
    if (!id) return fail(res,400,'INVALID_SERVICE','Choose a published demo service.');
    return res.status(201).json({ ticket: getTicket(db,id) });
  });
  router.get('/:id', (req,res) => {
    if (!canReadTicket(db,req.user,req.params.id)) return fail(res,404,'TICKET_NOT_FOUND','Ticket not found.');
    return res.json({ ticket: getTicket(db,req.params.id) });
  });
  router.post('/:id/messages', (req,res) => {
    if (!canReadTicket(db,req.user,req.params.id)) return fail(res,404,'TICKET_NOT_FOUND','Ticket not found.');
    const body = text(req.body?.body);
    if (body.length < 2 || body.length > 2000) return fail(res,400,'INVALID_MESSAGE','Reply must be 2 to 2000 characters.');
    addTicketMessage(db,req.params.id,req.user.id,body);
    return res.status(201).json({ ticket: getTicket(db,req.params.id) });
  });
  router.patch('/:id/status', requireRole('staff'), (req,res) => {
    const status = text(req.body?.status);
    if (!['open','in_progress','resolved'].includes(status)) return fail(res,400,'INVALID_STATUS','Choose a valid ticket status.');
    if (!updateTicketStatus(db,req.params.id,req.user.departmentId,status)) return fail(res,404,'TICKET_NOT_FOUND','Ticket not found in your department.');
    return res.json({ ticket: getTicket(db,req.params.id) });
  });
  return router;
}
export function createStaffRouter(db) {
  const router = Router();
  router.use(requireRole('staff'));
  router.post('/announcements', (req,res) => {
    const title=text(req.body?.title); const body=text(req.body?.body); const audienceScope=text(req.body?.audienceScope || 'public');
    if(title.length<5||title.length>140) return fail(res,400,'INVALID_TITLE','Title must be 5 to 140 characters.');
    if(body.length<10||body.length>2000) return fail(res,400,'INVALID_BODY','Announcement text must be 10 to 2000 characters.');
    if(!['public','signed_in'].includes(audienceScope)) return fail(res,400,'INVALID_AUDIENCE','Audience must be public or signed-in students.');
    const id=createAnnouncement(db,req.user,{title,body,audienceScope});
    res.status(201).json({ id });
  });
  return router;
}
