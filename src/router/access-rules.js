// eslint-disable-next-line import/no-cycle
import store from '@/store';

function requiresAuthentication(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (['beneficiaire', 'intervenant', 'admin', 'superAdmin'].includes(userRole)) next();
  else next('/login');
}

function requiresBeneficiaire(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'beneficiaire') next();
  else next(false);
}

function requiresIntervenant(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'intervenant') next();
  else next(false);
}

function requiresAdmin(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'admin') next();
  else next(false);
}

function requiresSuperAdmin(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'superAdmin') next();
  else next(false);
}

function requiresBeneficiaireOrIntervenant(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (['beneficiaire', 'intervenant'].includes(userRole)) next();
  else next(false);
}

function requiresIntervenantOrAdmin(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (['intervenant', 'admin', 'superAdmin'].includes(userRole)) next();
  else next(false);
}

function requiresBeneficiaireOrAdmin(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (['beneficiaire', 'admin', 'superAdmin'].includes(userRole)) next();
  else next(false);
}

function requiresAdminOrAbove(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'admin' || userRole === 'superAdmin') next();
  else next('/');
}

export {
  requiresAuthentication,
  requiresBeneficiaire,
  requiresIntervenant,
  requiresAdmin,
  requiresSuperAdmin,
  requiresBeneficiaireOrIntervenant,
  requiresIntervenantOrAdmin,
  requiresBeneficiaireOrAdmin,
  requiresAdminOrAbove,
};
